import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MarkdownRenderer from '../ui/MarkdownRenderer';

const RichEditor = ({ value, onChange, placeholder }) => {
  const [previewMode, setPreviewMode] = useState(false);
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image', 'code-block'
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <div className="flex border-b dark:border-gray-700">
        <button 
          className={`px-4 py-2 font-medium ${!previewMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setPreviewMode(false)}
        >
          Write
        </button>
        <button 
          className={`px-4 py-2 font-medium ${previewMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setPreviewMode(true)}
        >
          Preview
        </button>
      </div>
      
      {previewMode ? (
        <div className="min-h-[200px] p-4 prose prose-blue max-w-none dark:prose-invert">
          <MarkdownRenderer content={value} />
        </div>
      ) : (
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="min-h-[200px]"
          theme="snow"
        />
      )}
      
      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 text-xs text-gray-500">
        <div>Shortcut: ⌘ + Enter to submit</div>
        <div>Markdown supported</div>
      </div>
    </div>
  );
};

export default RichEditor;