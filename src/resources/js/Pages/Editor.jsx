import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card } from "flowbite-react";
import {
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { createReactEditorJS } from "react-editor-js";
import { Header } from "@editorjs/header";

export default class Editor extends React.Component {
  render() {
    const { auth, statistics } = this.props;
    const ReactEditorJS = createReactEditorJS();

    console.log(this.props);
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Admin-Dashboard
          </h2>
        }
      >
        <Head title="Admin-Dashboard" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow sm:rounded-lg">
              <ReactEditorJS tools={{
                header: Header,
              }} inlineToolbar />
              {/* <MyEditorComponent /> */}
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
