import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';

const CustomInput: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [props.value]);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      rows={1}
      className="flex-grow p-2 border border-gray-300 rounded mr-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none w-full"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default CustomInput;
