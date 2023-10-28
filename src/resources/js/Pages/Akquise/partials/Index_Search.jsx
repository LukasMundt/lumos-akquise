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
  const { search } = usePage().props;

  const { data, setData } = useForm({
    search: search === null ? "" : search,
  });

  // const myRefname = useRef < HTMLInputElement > null;
  const keyDown = (e) => {
    if (e.key === "Enter") {
      router.replace(route(route().current(), { search: data.search }))
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
