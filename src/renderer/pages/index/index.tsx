import { useMemoizedFn } from 'ahooks';
import { Button, FloatButton, Image, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { CopyOutlined, CloudDownloadOutlined } from '@ant-design/icons';

const { ipcRenderer } = window.electron;

export function Index() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const updateTask = useMemoizedFn(() => {
    if (loading) {
    } else {
      ipcRenderer.sendMessage('renderer-events', { event: 'scan-emoji' });
    }
    setLoading((prev) => !prev);
  });

  const handleMainThreadMessage = useMemoizedFn(async (payload) => {
    switch (payload.event) {
      case 'new-item': {
        console.warn('new-item', payload.item)
        setImages((prev) => Array.from(new Set([...prev, payload.item])));
        break;
      }
      case 'scan-finished': {
        setLoading(false);
        break;
      }
      default:
        break;
    }
  });

  useEffect(() => {
    ipcRenderer.on('main-events', handleMainThreadMessage);
  }, []);

  const copyImage = useMemoizedFn(async (image) => {
    try {
      const blob = await fetch(image).then((resp) => resp.blob());
      const imageBlob = new Blob([blob], { type: 'image/png' });

      try {
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': imageBlob,
          }),
        ]);
      } catch (error) {
        console.log('ERROR');
        console.error(error);
      }
    } catch (e) {
      console.log(e);
    }
  });

  const downloadImage = useMemoizedFn(async (image) => {
    try {
      const anchor = document.createElement('a');
      // Set the href to the image URL
      anchor.href = image;

      // Optionally set the download attribute to a default file name
      // anchor.download = `emoji_${Date.now()}.jpg`

      // Trigger the download by simulating a click
      document.body.appendChild(anchor);
      anchor.click();

      // Cleanup the DOM
      document.body.removeChild(anchor);
    } catch (e) {
      console.log(e);
    }
  });

  const handleImageAction = useMemoizedFn(async (image, action) => {
    switch (action) {
      case 'download': {
        await downloadImage(image);
        message.success('Download Success');
        break;
      }
      case 'copy': {
        await copyImage(image);
        message.success('Copy Success');
        break;
      }
      default:
        break;
    }
  });

  return (
    <div className="h-full w-full">
      <Button type="primary" block onClick={updateTask} loading={loading}>
        {loading ? 'Scanning' : 'Start'}
      </Button>
      <div className="grid gap-4 grid-cols-2 mt-2 bg-[#151515]">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="group-hover:flex w-full h-full absolute z-10 bg-black/[.4] hidden justify-center items-center gap-4">
              <CopyOutlined
                onClick={() => handleImageAction(image, 'copy')}
                className="cursor-pointer text-white text=[20px]"
              />
              <CloudDownloadOutlined
                onClick={() => handleImageAction(image, 'download')}
                className="cursor-pointer text-white text=[20px]"
              />
            </div>
            <Image
              alt="emoji"
              src={image}
              preview={false}
              onClick={(e) => copyImage(image)}
            />
          </div>
        ))}
      </div>
      <FloatButton.BackTop visibilityHeight={200} target={() => document.querySelector('#content-router-view') as HTMLElement}/>
    </div>
  );
}
