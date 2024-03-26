import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function FirstStep({ className = "", setInput, streetAndNumber = "", step}) {

  const { data, setData, errors, processing, recentlySuccessful } =
    useForm({
      strasse: streetAndNumber,
      hausnummer: "",
    });

  const submit = async (e) => {
    e.preventDefault();

    setInput(data.strasse);
  };

  return (
    <section className={className} id="firstSection">
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1">
          {/* Straße */}
          <div>
            <InputLabel htmlFor="strasse" value="Straße und Hausnummer" />

            <TextInput
              id="strasse"
              className="w-full"
              onChange={(e) => {
                setData("strasse", e.target.value);
              }}
            />

            <InputError className="mt-2" message={errors.strasse} />
          </div>
          {/* Hausnummer */}
          {/* <div>
            <InputLabel htmlFor="hausnummer" value="Hausnummer" />

            <TextInput
              id="hausnummer"
              className="w-full"
              onChange={(e) => {
                setData("hausnummer", e.target.value);
              }}
            />

            <InputError className="mt-2" message={errors.hausnummer} />
          </div> */}
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Weiter</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
