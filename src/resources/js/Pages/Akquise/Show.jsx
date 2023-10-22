import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Show_Karte from "./partials/Show_Karte";

export default class Show extends React.Component {
  render() {
    const { auth, projekt } = this.props;
    console.log(this.props);
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {projekt.strasse + " " + projekt.hausnummer}
          </h2>
        }
      >
        <Head title="Admin-Dashboard" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div></div>
              <div>
                <Show_Karte />
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
