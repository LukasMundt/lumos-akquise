import InputError from "@/Components/Inputs/InputError";
import InputLabel from "@/Components/Inputs/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Inputs/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import CreatableSelect from "react-select/creatable";
import ReactSelect from "@/Components/Inputs/ReactSelect";
import { FileInput } from "flowbite-react";

export default function CreateForm({ status, className = "" }) {
    const { user } = usePage().props;
    

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            file: undefined,
        });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route("finances.import.store"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* File */}
                <div>
                    <InputLabel htmlFor="file" value="Datei" />

                    <FileInput id="file" onChange={(e) => {setData("file", e.target.files[0])}}/>

                    <InputError className="mt-2" message={errors.file} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
            </form>
        </section>
    );
}
