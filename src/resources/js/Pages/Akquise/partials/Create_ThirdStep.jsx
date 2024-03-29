import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Label, Select } from "flowbite-react";

import Checkbox from "@/Components/Inputs/Checkbox";
import MyMap from "./MyMap";
import Card from "@/Components/Card";
import React from "react";

export default function ThirdStep({ className = "", rawData }) {
  // const [rawData, setRawData] = useRemember([], "rawCreatableData");
  const { domain } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      strasse: rawData.strasse ?? "",
      hausnummer: rawData.hausnummer ?? "",
      plz: rawData.plz,
      stadt: rawData.stadt,
      stadtteil: rawData.stadtteil,
      teilung: true,
      abriss: true,
      nicht_gewuenscht: false,
      retour: false,
      status: "erfasst",
      coordinates_lat: rawData.lat ?? null,
      coordinates_lon: rawData.lon ?? null,
    });

  React.useEffect(() => {
    // setData({
    //   hausnummer: rawData.hausnummer,
    //   plz: rawData.plz,
    //   coordinates_lat: rawData.lat,
    //   coordinates_lon: rawData.lon,
    //   stadt: rawData.stadt,
    //   stadtteil: rawData.stadtteil,
    //   strasse: rawData.strasse,
    // });
    // console.log("key changed: " + keyCr);
  }, [rawData]);

  const submit = (e) => {
    e.preventDefault();

    post(route("akquise.akquise.store", { domain: domain }));
  };

  return (
    <section className={className}>
      <form onSubmit={submit} className="mt-6 space-y-6">
        {rawData.lat != "" &&
        rawData.lon != "" &&
        rawData.lat != undefined &&
        rawData.lon != undefined &&
        data.coordinates_lat != null &&
        data.coordinates_lon != null ? (
          <MyMap lat={rawData.lat} lon={rawData.lon} scrollWheelZoom={false} />
        ) : (
          ""
        )}

        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Strasse */}
            <div>
              <InputLabel htmlFor="strasse" value="Straße" />

              <TextInput
                className="w-full"
                id="strasse"
                value={data.strasse}
                onChange={(e) => {
                  // setData({ coordinates_lat: null, coordinates_lon: null });
                  setData({
                    ...data,
                    strasse: e.target.value,
                    coordinates_lat: null,
                    coordinates_lon: null,
                  });
                }}
              />

              <InputError className="mt-2" message={errors.strasse} />
            </div>
            {/* Hausnummer */}
            <div>
              <InputLabel htmlFor="hausnummer" value="Hausnummer" />

              <TextInput
                className="w-full"
                id="hausnummer"
                value={data.hausnummer}
                onChange={(e) => {
                  // setData({ coordinates_lat: null, coordinates_lon: null });
                  setData({
                    ...data,
                    hausnummer: e.target.value,
                    coordinates_lat: null,
                    coordinates_lon: null,
                  });
                }}
              />

              <InputError className="mt-2" message={errors.hausnummer} />
            </div>
            {/* PLZ */}
            <div>
              <InputLabel htmlFor="plz" value="Postleitzahl" />

              <TextInput
                className="w-full"
                id="plz"
                value={data.plz}
                onChange={(e) => {
                  // setData({ coordinates_lat: null, coordinates_lon: null });
                  setData({
                    ...data,
                    plz: e.target.value,
                    coordinates_lat: null,
                    coordinates_lon: null,
                  });
                }}
              />

              <InputError className="mt-2" message={errors.plz} />
            </div>
            {/* Stadtteil */}
            <div>
              <InputLabel htmlFor="stadtteil" value="Stadtteil" />

              <TextInput
                className="w-full"
                id="stadtteil"
                value={data.stadtteil}
                onChange={(e) => {
                  setData("stadtteil", e.target.value);
                }}
              />

              <InputError className="mt-2" message={errors.stadtteil} />
            </div>
            {/* Stadt */}
            <div>
              <InputLabel htmlFor="stadt" value="Stadt" />

              <TextInput
                className="w-full"
                id="stadt"
                value={data.stadt}
                onChange={(e) => {
                  setData({
                    ...data,
                    stadt: e.target.value,
                    coordinates_lat: null,
                    coordinates_lon: null,
                  });
                }}
              />

              <InputError className="mt-2" message={errors.stadt} />
            </div>
          </div>
        </Card>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Teilung und Abriss */}
            <div>
              {/* Teilung */}
              <div>
                <Checkbox
                  id="teilung"
                  checked={data.teilung}
                  onChange={(e) => {
                    setData("teilung", !data.teilung);
                  }}
                />
                <Label className="ml-2" htmlFor="teilung" value="Teilung" />
                <InputError className="mt-2" message={errors.teilung} />
              </div>
              {/* Abriss */}
              <div>
                <Checkbox
                  id="abriss"
                  checked={data.abriss}
                  onChange={(e) => {
                    setData("abriss", !data.abriss);
                  }}
                />
                <Label className="ml-2" htmlFor="abriss" value="Abriss" />
                <InputError className="mt-2" message={errors.abriss} />
              </div>
            </div>
            {/* Nicht gewünscht und Retour */}
            <div>
              {/* Nicht gewünscht */}
              <div>
                <Checkbox
                  id="nicht_gewuenscht"
                  checked={data.nicht_gewuenscht}
                  onChange={(e) => {
                    setData("nicht_gewuenscht", !data.nicht_gewuenscht);
                  }}
                />
                <Label
                  className="ml-2"
                  htmlFor="nicht_gewuenscht"
                  value="Nicht gewünscht"
                />
                <InputError
                  className="mt-2"
                  message={errors.nicht_gewuenscht}
                />
              </div>
              {/* Retour */}
              <div>
                <Checkbox
                  id="retour"
                  checked={data.retour}
                  onChange={(e) => {
                    setData("retour", !data.retour);
                  }}
                />
                <Label className="ml-2" htmlFor="retour" value="Retour" />
                <InputError className="mt-2" message={errors.retour} />
              </div>
            </div>
            {/* Status */}
            <div>
              <InputLabel htmlFor="status" value="Status" />

              <Select
                className="w-full"
                id="status"
                value={data.status}
                onChange={(e) => {
                  setData("status", e.target.value);
                }}
              >
                <option value="Erfasst">Erfasst</option>
                <option value="Werbemassnahmen">Werbemaßnahmen</option>
                <option value="Nicht Gewünscht">Nicht Gewünscht</option>
                <option value="Im Verkauf">Im Verkauf</option>
                <option value="Durch uns verkauft">Durch uns verkauft</option>
                <option value="Durch Konkurrenz behandelt">
                  Durch Konkurrenz behandelt
                </option>
              </Select>

              <InputError className="mt-2" message={errors.status} />
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Speichern</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gespeichert.
            </p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
