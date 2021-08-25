import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TinyEditor({ onChange, currentTask, currentTaskType }) {

  const editorRef = useRef(null);
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    onChange(value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <>
      <Editor
        apiKey='fuegeebfi4wbyx35ou0prw31rof6p1sadgeids1lmfkz3r6c'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={currentTaskType === "edit" ? currentTask.description : "<p>Введите ваш контент...</p>"}
        value={value}
        onEditorChange={(newValue, editor) => setValue(newValue)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
}

export default TinyEditor;