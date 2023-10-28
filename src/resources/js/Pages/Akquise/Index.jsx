import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Table } from "flowbite-react";
import Checkbox from "@/Components/Inputs/Checkbox";
import { BarsArrowDownIcon } from "@heroicons/react/24/outline";
import Pagination from "./partials/Pagination";
import Card from "@/Components/Card";
import Index_Search from "./partials/Index_Search";

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
          <div className="grid lg:grid-cols-5 gap-4">
            <div>
              {/* <Card className="justify-between"> */}
              <Index_Search className="flex-none" />
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
                    <Table.Row>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell><Link href={route('akquise.akquise.show',{projekt: projekt.projekt_id})}>{projekt.strasse}</Link></Table.Cell>
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

          <Pagination pagination={projekte} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
