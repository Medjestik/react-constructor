import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TinyEditor({ onChange, currentTask, currentTaskType }) {

  const editorRef = useRef(null);
  const [value, setValue] = React.useState();

  console.log(currentTask);

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
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern"
          ],
          toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview",
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          paste_data_images: true,
        }}
      />
    </>
  );
}

export default TinyEditor;