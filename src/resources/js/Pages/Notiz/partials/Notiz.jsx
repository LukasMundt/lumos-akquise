import Card from "@/Components/Card";
// import Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";
// import { Delimiter } from "@editorjs/delimiter";
// import {Header} from "@editorjs/header";
// import { Marker } from "@editorjs/marker";
// import { NestedList } from "@editorjs/nested-list";
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { createReactEditorJS } from "react-editor-js/dist/react-editor-js.cjs";

export default function Notiz({ notiz, className, link = null }) {
  const ReactEditorJS = createReactEditorJS();
  const { projekt } = usePage().props;

  // console.log(notiz);
  const data = notiz.inhalt;
  const defaultValue = JSON.parse(data);
  // console.log(data);

  return (
    <div className={"" + className} key={notiz.id}>
      <Card className="dark:bg-gray-700 bg-gray-200 link:text-purple-600 relative">
        <div className="absolute z-50 right-0 pr-4">
          <div className="relative">
            <Button
              color="gray"
              size="sm"
              href={route("akquise.akquise.showMitNotiz", {
                projekt: projekt.id,
                notiz: notiz.id,
              })}
              title="Notiz bearbeiten"
            >
              <>
                <ArrowTopRightOnSquareIcon className="w-6" />
              </>
            </Button>
          </div>
        </div>

        <ReactEditorJS
          // onInitialize={handleInitialize}
          narrow={false}
          minHeight={0}
          readOnly
          defaultValue={defaultValue}
          tools={
            {
              // header: Header,
              // delimiter: Delimiter,
              // marker: Marker,
              // nestedList: NestedList,
            }
          }
          holder={"custom" + notiz.id}
        >
          <div id={"custom" + notiz.id} className="p-0"></div>
        </ReactEditorJS>
      </Card>
    </div>
  );
}
