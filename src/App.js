import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {}, [editorState]);

  const htm = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    return {
      __html: markup,
    };
  };
  return (
    <div>
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="p-4 border border-black m-4">
        <Editor
          editorClassName="bg-gray-100 mt-2 p-2"
          placeholder="Digite algo..."
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "emoji",
              "image",
              "remove",
              "history",
            ],
          }}
        />
      </div>

      <div
        dangerouslySetInnerHTML={htm()}
        className="m-4 border border-black p-4"
      ></div>
    </div>
  );
}
