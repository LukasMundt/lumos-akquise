import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateForm from "./partials/CreateForm";

export default class Create extends React.Component {
  render() {
    const { auth, statistics } = this.props;
    console.log(this.props);
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projekt erstellen
          </h2>
        }
      >
        <Head title="Projekt erstellen" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <CreateForm />
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
