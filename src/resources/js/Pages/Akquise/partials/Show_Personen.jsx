import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLinkButton from "@/Components/PrimaryLinkButton";
import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";

export default function Show_Personen({ gruppen = [], projektId, domain}) {
  return (
    <section className="mt-12 space-y-4">
      <div className="flex justify-center">
        <div className="p-4 bg-emerald-300 rounded-full" title="Details">
          <UserIcon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex justify-center">
        <PrimaryLinkButton
          href={route("akquise.akquise.personen.associate", {
            projekt: projektId,
            domain: domain
          })}
        >
          <LinkIcon className="w-4 mr-3" /> Person verknüpfen
        </PrimaryLinkButton>
      </div>

      <Card directClassName="space-y-3">
        {gruppen.length === 0 ? (
          <div>Diesem Projekt sind keine Personen zugeordnet.</div>
        ) : (
          ""
        )}
        {gruppen.map((gruppe, indexG) => {
          return gruppe.personen.map((person, indexP) => {
            console.log(person);
            return (
              <>
                <div className="flex space-x-3 justify-between" key={person.id}>
                  <div>
                    <UserCircleIcon className="w-8" />
                  </div>
                  <div className="flex-grow">
                    <div>
                      {(person.anrede === null ? "" : person.anrede + " ") +
                        (person.titel === null ? "" : person.titel + " ") +
                        (person.vorname === null ? "" : person.vorname + " ") +
                        (person.nachname === null ? "" : person.nachname)}
                    </div>
                    {person.telefonnummern === null ? (
                      ""
                    ) : (
                      <div>
                        Tel:{" "}
                        {person.telefonnummern.map((nummer, index) => (
                          <>
                            <a href={"tel:"+nummer.telefonnummer} key={nummer.id}>{nummer.telefonnummer}</a>
                            {index + 1 === person.telefonnummern.length
                              ? ""
                              : ", "}
                          </>
                        ))}
                      </div>
                    )}
                    {person.email === null ? (
                      ""
                    ) : (
                      <div>
                        E-Mail:{" "}
                        <a href={"mailto:" + person.email}>{person.email}</a>
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      color="gray"
                      href={route("projectci.person.show", {
                        person: person.id,
                        domain: domain
                      })}
                    >
                      <ArrowTopRightOnSquareIcon className="w-5" />
                    </Button>
                  </div>
                </div>
                {indexG + 1 === gruppen.length ||
                indexP + 1 === gruppe.personen ? (
                  ""
                ) : (
                  <div className="w-full flex justify-center">
                    <hr className="border border-2 dark:border-gray-500 w-1/2 rounded-full" />
                  </div>
                )}
              </>
            );
          });
        })}
      </Card>
    </section>
  );
}
