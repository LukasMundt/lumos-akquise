import { usePage } from "@inertiajs/react";
import { Alert } from "flowbite-react";

import MyMap from "./MyMap";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Show_Karte({ status, className = "" }) {
  const { projekt } = usePage().props;
  if (projekt.coordinates_lat === 0 || projekt.coordinates_lon === 0) {
    return (
      <Alert color="failure" icon={InformationCircleIcon}>
        Leider sind die gespeicherten Koordinaten nicht korrekt.
      </Alert>
    );
  }

  return (
    <section className={className}>
      <MyMap lat={projekt.coordinates_lat} lon={projekt.coordinates_lon} />
    </section>
  );
}
