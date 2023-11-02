import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from "@/Components/Inputs/TextInput";
import { TextInput } from "flowbite-react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import CreatableSelect from "react-select/creatable";
import ReactSelect from "@/Components/Inputs/ReactSelect";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import PrimaryLinkButton from "@/Components/PrimaryLinkButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

export default function Index_Search({ className = "" }) {
  // Lädt den Wert aus den properties der Page in die Variable search
  const { search } = usePage().props;

  // lädt die parameter der aktuellen Seite in ein Array
  let paramsRaw = new URLSearchParams(window.location.search)
    .toString()
    .split("&");
  var params = {};
  paramsRaw.map((param) => {
    let split = param.split("=");
    params[split[0]] = decodeURI(split[1]);
  });

  const { data, setData } = useForm({
    search: search === null ? "" : decodeURI(search),
  });

  const keyDown = (e) => {
    if (e.key === "Enter") {
      params = {}; // Da bei einer neuen Anfrage zu der ersten Seite gesprungen werden soll werden die anderen Parameter hier nicht übergeben.
      params['search'] = data.search;
      router.get(route(route().current()), params);
    }
  };
  

  return (
    <div className={"flex items-center gap-4 " + className}>
      <TextInput
        id="search"
        className="w-full"
        value={data.search}
        onKeyDown={keyDown}
        icon={MagnifyingGlassIcon}
        onChange={(e) => {
          setData("search", e.target.value);
        }}
      />
    </div>
  );
}
