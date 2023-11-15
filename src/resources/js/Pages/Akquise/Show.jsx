import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Show_Karte from "./partials/Show_Karte";
import Card from "@/Components/Card";
import {
  InformationCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Show_Status from "./partials/Show_Status";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";
import Show_KartenModal from "./partials/Show_KartenModal";
import Drawer from "@/Components/Drawer";
import Form from "../Notiz/Form";
import Show_Notizen from "../Notiz/Show_Notizen";
import Show_Personen from "./partials/Show_Personen";

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
        <Head title={projekt.strasse + " " + projekt.hausnummer + " ansehen"} />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Drawer>
              <Form related_type="Lukasmundt\Akquise\Models\Akquise" related_id={projekt.akquise.id} />
            </Drawer>
            <Show_Status status={projekt.akquise.status} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* generelle Informationen */}
                <section>
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-4 bg-emerald-300 rounded-full"
                      title="Standort"
                    >
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <Card directClassName="grid grid-cols-2">
                    <div>Straße und Hausnummer</div>
                    <div>{projekt.strasse + " " + projekt.hausnummer}</div>
                    <div>Postleitzahl</div>
                    <div>{projekt.plz}</div>
                    <div>Stadtteil</div>
                    <div>{projekt.stadtteil}</div>
                  </Card>
                </section>
                {/* Details Akquise */}
                <section className="mt-12">
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-4 bg-emerald-300 rounded-full"
                      title="Details"
                    >
                      <InformationCircleIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <Card directClassName="grid grid-cols-2">
                    <div>Retour</div>
                    <div>
                      {projekt.akquise.retour ? (
                        <ExclamationCircleIcon className="w-6 text-yellow-300" />
                      ) : (
                        <MinusCircleIcon className="w-6 text-gray-400" />
                      )}
                    </div>
                    <div>Nicht gewünscht</div>
                    <div>
                      {projekt.akquise.nicht_gewuenscht ? (
                        <ExclamationCircleIcon className="w-6 text-red-500" />
                      ) : (
                        <MinusCircleIcon className="w-6 text-gray-400" />
                      )}
                    </div>
                    <div>Teilung</div>
                    <div>
                      {projekt.akquise.teilung ? (
                        <CheckCircleIcon className="w-6 text-green-500" />
                      ) : (
                        <MinusCircleIcon className="w-6 text-gray-400" />
                      )}
                    </div>
                    <div>Abriss</div>
                    <div>
                      {projekt.akquise.abriss ? (
                        <CheckCircleIcon className="w-6 text-green-500" />
                      ) : (
                        <MinusCircleIcon className="w-6 text-gray-400" />
                      )}
                    </div>
                  </Card>
                  
                </section>
                <Show_Personen gruppen={projekt.akquise.gruppen} projektId={projekt.id}/>
                <Show_Notizen notizen={projekt.akquise.notizen}/>
              </div>
              <div className="space-y-4">
                <Show_Karte />
                <Show_KartenModal lat={projekt.coordinates_lat} lon={projekt.coordinates_lon} />
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
}
