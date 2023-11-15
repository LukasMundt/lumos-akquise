import Card from "@/Components/Card";
import { Delimiter } from "@editorjs/delimiter";
import { Header } from "@editorjs/header";
import { Marker } from "@editorjs/marker";
import { NestedList } from "@editorjs/nested-list";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { createReactEditorJS } from "react-editor-js";

export default function Notiz({ notiz, className }) {
  const ReactEditorJS = createReactEditorJS();

  console.log(notiz);
  const data = JSON.parse(notiz.inhalt);
  console.log(data);

  return (
    <div className={"" + className} key={notiz.id}>
      <Card className="dark:bg-gray-700 bg-gray-200 link:text-purple-600">
        {notiz.blocks.map((block) => {
          if (block.type === "header") {
            switch (block.data.level) {
              case 1:
                return (
                  <div>
                    <h1
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h1>
                  </div>
                );

              default:
                console.log("point reached");
                return (
                  <div>
                    <h2
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h2>
                  </div>
                );
            }
          } else {
            return (
              <div>
                <p dangerouslySetInnerHTML={{ __html: block.data.text }}></p>
              </div>
            );
          }
          return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
        })}
      </Card>
    </div>
  );
}
