import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import axios from "axios";
import React from "react";

export default function FixBauantrag2Link({
  auth,
  domain
}) {
  const [errors, updateErrors] = React.useState({ rawLink: [] });
  const [result, updateResult] = React.useState(false);

  const { data, setData, processing, recentlySuccessful } = useForm({
    rawLink: "",
  });
  const submit = (e) => {
    e.preventDefault();

    axios
      .post(
        route("akquise.tools.fixBauantrag2Link", {
          domain: domain,
        }),
        data
      )
      .then((response) => {
        updateResult(response.data);
        updateErrors([]);
      })
      .catch((error) => {
        updateErrors(error.response.data.errors);
        updateResult(false);
      });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Bauantrag2-Link reparieren
        </h2>
      }
    >
      <Head title="Bauantrag2-Link reparieren" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
              {/* Link */}
              <div>
                <InputLabel htmlFor="rawLink" value="Link" />

                <TextInput
                  className="w-full"
                  id="rawLink"
                  value={data.rawLink}
                  onChange={(e) => {
                    setData("rawLink", e.target.value);
                  }}
                />

                <InputError className="mt-2" message={errors.rawLink ?? ""} />
              </div>

              <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Reparieren</PrimaryButton>

                <Transition
                  show={recentlySuccessful}
                  enterFrom="opacity-0"
                  leaveTo="opacity-0"
                  className="transition ease-in-out"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Saved.
                  </p>
                </Transition>
              </div>
              {result ? (
                <Card>
                  <div className="truncate">
                    <a target="_blank" href={result}>
                      {result}
                    </a>
                  </div>
                </Card>
              ) : (
                ""
              )}
            </form>
          </section>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
