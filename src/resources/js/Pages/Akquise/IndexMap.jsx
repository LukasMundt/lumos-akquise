import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Table } from "flowbite-react";
import Checkbox from "@/Components/Inputs/Checkbox";
import { BarsArrowDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import Pagination from "./partials/Pagination";
import Card from "@/Components/Card";
import Index_Search from "./partials/Index_Search";
import SimplePagination from "./partials/SimplePagination";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLinkButton from "@/Components/PrimaryLinkButton";
import MyMapMulti from "./partials/MyMapMulti";

export default function IndexMap({}) {
  const { user, auth, markers } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      strasse: "",
      hausnummer: "",
    });

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("akquise.akquise.create2"));
  };

  console.log(usePage().props);
  const bodyHeight = document.body.clientHeight;
  const headerHeight =
    document.getElementsByTagName("header").length > 0
      ? document.getElementsByTagName("header").item(0).clientHeight
      : 0;
  const navHeight =
    document.getElementsByTagName("nav").length === 0
      ? 0
      : document.getElementsByTagName("nav").item(0).clientHeight;
  const mapContainerHeight =
    document.getElementsByName("mapContainer").length > 0
      ? document.getElementById("mapContainer").item(0).clientHeight
      : 450;
  console.log(bodyHeight * 0.5);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Übersicht
        </h2>
      }
    >
      <Head title="Übersicht" />

      <div
        className="py-12"
        style={{ height: bodyHeight - (headerHeight + navHeight + 1) + "px" }}
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 h-full">
          <MyMapMulti
            center={[53.62431995, 9.9539994]}
            markers={markers}
            zoom={12}
            height={
              (document.body.clientHeight === 0
                ? screen.availHeight
                : document.body.clientHeight) *
                0.64 +
              "px"
            }
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
