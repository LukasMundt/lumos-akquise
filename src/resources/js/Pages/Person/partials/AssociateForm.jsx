import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import ReactCreatableSelect from "@/Components/Inputs/ReactCreatableSelect";
import ReactSelect from "@/Components/Inputs/ReactSelect";

export default function AssociateForm({ status, className = "" }) {
  const { user, personen, projekt } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      nachname: [],
      typ: [],
    });

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    post(
      route("akquise.akquise.personen.storeAssociation", { projekt: projekt })
    );
  };

  return (
    <section className={className}>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-3">
          {/* Gruppe/Nachname */}
          <div>
            <InputLabel htmlFor="gruppe" value="Gruppe/ Nachname" />

            <div className="">
              <ReactCreatableSelect
                id="gruppe"
                options={personen}
                // isMulti
                required
                isSearchable
                isClearable
                onChange={(choice) => setData("nachname", choice)}
              />
            </div>

            <InputError className="mt-2" message={errors.nachname} />
          </div>

          <div>
            <InputLabel htmlFor="type" value="Typ" />

            <div className="">
              <ReactSelect
                id="type"
                // Changes of the options also have to be made in the request
                options={[
                  { label: "Nachbar", value: "Nachbar" },
                  { label: "Eigentümer", value: "Eigentümer" },
                  { label: "Sonstiges", value: "Sonstiges" },
                ]}
                defaultValue={[{label: "Nachbar", value: "Nachbar"}]}
                required
                isSearchable
                isClearable
                onChange={(choice) => setData("typ", choice)}
              />
            </div>

            <InputError className="mt-2" message={errors.strasse} />
          </div>
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
