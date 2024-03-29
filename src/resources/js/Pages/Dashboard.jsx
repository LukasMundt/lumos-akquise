import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card } from "flowbite-react";
import {
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  MegaphoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default class Dashboard extends React.Component {
  render() {
    const { auth, statistics } = this.props;
    
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Akquise-Dashboard
          </h2>
        }
      >
        <Head title="Akquise-Dashboard" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow sm:rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card>
                  <div className="flex flex-row content-center">
                    <div className="mr-3 self-center">
                      <div className="p-4 bg-emerald-300 rounded-full text-gray-600">
                        <HomeModernIcon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="self-center text-lg">
                      <span className="font-black">
                        {statistics.adressenAnzahl}
                      </span>{" "}
                      Projekte in der Akquise
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-row content-center">
                    <div className="mr-3 self-center">
                      <div className="p-4 bg-emerald-300 rounded-full text-gray-600">
                        <UserGroupIcon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="self-center">
                      <b>Personen gesamt</b>
                      <br />
                      {statistics.personenAnzahl}
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-row content-center">
                    <div className="mr-3 self-center">
                      <div className="p-4 bg-emerald-300 rounded-full text-gray-600">
                        <MegaphoneIcon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="self-center">
                      {statistics.KampagnenAnzahl}
                      Kampagnen
                    </div>
                  </div>
                </Card>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
