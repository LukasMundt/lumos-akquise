import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Table } from "flowbite-react";
import Checkbox from "@/Components/Inputs/Checkbox";
import { PlusIcon } from "@heroicons/react/24/outline";
import Index_Search from "./partials/Index_Search";
import SimplePagination from "./partials/SimplePagination";
import PrimaryLinkButton from "@/Components/PrimaryLinkButton";
import Pagination from "@/Components/Pagination";

export default function Index({}) {
  const { user, auth, projekte } = usePage().props;

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

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <Index_Search className="flex-none" />
            <div className="flex justify-between col-span-1 lg:col-span-4">
              <PrimaryLinkButton href={route("akquise.akquise.create.1")}>
                <PlusIcon className="w-6 me-2" />
                Projekt erstellen
              </PrimaryLinkButton>
              <SimplePagination pagination={projekte} />
            </div>
          </div>
          <div className="grid lg:grid-cols-5 gap-4">
            <div>
              {/* <Card className="justify-between"> */}

              {/* </Card> */}
            </div>

            <div className="col-span-4">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>#</Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}
                      Straße
                      {/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}Hausnummer{/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}PLZ{/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}Stadtteil{/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}Personen{/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}Status{/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}Anmerkungen{/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="flex justify-between">
                      {/* <Link> */}Maßnahmen{/* </Link> */}
                      <div>{/* <BarsArrowDownIcon className="w-4" /> */}</div>
                    </div>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {projekte.data.map((projekt) => (
                    <Table.Row
                      key={projekt.id}
                      className={
                        (projekt.nicht_gewuenscht
                          ? "odd:bg-red-400 even:bg-red-300 odd:dark:bg-red-950 even:dark:bg-red-800 "
                          : "") +
                        (projekt.retour
                          ? "odd:bg-yellow-400 even:bg-yellow-300 odd:dark:bg-yellow-950 even:dark:bg-yellow-800"
                          : "")
                      }
                    >
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          href={route("akquise.akquise.show", {
                            projekt: projekt.id,
                          })}
                        >
                          {projekt.strasse}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{projekt.hausnummer}</Table.Cell>
                      <Table.Cell>{projekt.plz}</Table.Cell>
                      <Table.Cell>{projekt.stadtteil}</Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell>{projekt.status}</Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>

          <Pagination
            current_page={projekte.current_page}
            last_page={projekte.last_page}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
