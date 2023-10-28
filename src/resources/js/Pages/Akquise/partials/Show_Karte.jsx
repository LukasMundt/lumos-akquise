import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import CreatableSelect from "react-select/creatable";
import ReactSelect from "@/Components/Inputs/ReactSelect";
import { Alert, FileInput, Label, Select, ToggleSwitch } from "flowbite-react";

import Checkbox from "@/Components/Inputs/Checkbox";
import MyMap from "./MyMap";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Show_Karte({ status, className = "" }) {
  const { projekt } = usePage().props;
  if(projekt.coordinates_lat === 0 || projekt.coordinates_lon === 0){
    return <Alert color="failure" icon={InformationCircleIcon}>Leider sind die gespeicherten Koordinaten nicht korrekt.</Alert>
  }

  return <section className={className}>
    <MyMap lat={projekt.coordinates_lat} lon={projekt.coordinates_lon} />
  </section>;
}
