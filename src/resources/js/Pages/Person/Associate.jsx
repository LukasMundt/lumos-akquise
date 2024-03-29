import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AssociateForm from "./partials/AssociateForm";
import Card from "@/Components/Card";

export default class Associate extends React.Component {
  render() {
    const { auth, projektStr, domain } = this.props;
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Person verknüpfen
          </h2>
        }
      >
        <Head title="Person verknüpfen" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Card>
              <span>Projekt:</span>
              <br />
              {projektStr}
            </Card>
            <Card>
              <AssociateForm domain={domain} />
            </Card>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
