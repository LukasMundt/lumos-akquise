import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { createReactEditorJS } from "react-editor-js/dist/react-editor-js.cjs";
// import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker";
import NestedList from "@editorjs/nested-list";
import React from "react";
import { Button } from "flowbite-react";
import InputError from "@/Components/Inputs/InputError";

export default function Form({
  className = "",
  related_type,
  related_id,
  id = null,
  defaultValue = "",
  domain
}) {
  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      id: id,
      notiz: defaultValue != null ? JSON.parse(defaultValue) : null,
      related_type: related_type ?? "",
      related_id: related_id ?? "",
    });
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleClear = React.useCallback(async () => {
    await editorCore.current.clear();
  });

  const handleSave = React.useCallback(async () => {
    return await editorCore.current.save();
  }, []);

  const ReactEditorJS = createReactEditorJS();

  const submit = async function (e) {
    e.preventDefault();
    let tempData = data;
    tempData.notiz = await handleSave();

    post(route("projectci.notiz.save", {domain: domain}));
  };

  return (
    <section className={className+" z-[100]"} >
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="flex justify-end gap-4 pt-4">
        <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
          <PrimaryButton disabled={processing}>Speichern</PrimaryButton>

          <Button size="sm" onClick={handleClear} color="failure">
            Leeren
          </Button>

          
        </div>

        <div>
          <InputError className="mt-2" message={errors.related_id} />
          <InputError className="mt-2" message={errors.related_type} />
        </div>

        <ReactEditorJS
          
          onInitialize={handleInitialize}
          defaultValue={data.notiz}
          tools={{
            // header: Header,
            delimiter: Delimiter,
            // marker: Marker,
            // nestedList: NestedList,
          }}
          holder="custom"
        >
          <div
            id="custom"
            className="dark:bg-gray-500 bg-gray-300 p-4 rounded"
          ></div>
        </ReactEditorJS>
      </form>
    </section>
  );
}
