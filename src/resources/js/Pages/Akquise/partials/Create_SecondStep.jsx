import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useRemember } from "@inertiajs/react";
import { Spinner } from "flowbite-react";
import Card from "@/Components/Card";
import LoadableMap from "./LoadableMap";

export default function SecondStep({
  className = "",
  creatables,
  domain,
  setSecondToThird,
  loaded,
}) {
  const [shownItems, setShownItems] = useRemember(10, "shownItemsCount");

  return (
    <section className={className + " text-gray-800 dark:text-gray-200"}>
      {loaded && creatables.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {creatables.map((creatable, index) =>
            index < shownItems ? (
              <Card
                key={index}
                renderImage={() => (
                  <LoadableMap
                    lat={creatable.lat}
                    lon={creatable.lon}
                    scrollWheelZoom={false}
                  />
                )}
              >
                <h2>
                  {creatable.composed.strasse +
                    " " +
                    creatable.composed.hausnummer}
                </h2>

                <p>{creatable.composed.plz + " " + creatable.composed.stadt}</p>

                <PrimaryButton
                  id={index}
                  className="w-full text-center"
                  onClick={(e) => setSecondToThird(e.target.id)}
                >
                  Weiter
                </PrimaryButton>
              </Card>
            ) : (
              ""
            )
          )}
        </div>
      ) : creatables.length === 0 && loaded ? (
        <div className="flex flex-col justify-center">
          <p>Leider wurden keine Ergebnisse gefunden.</p>
          <PrimaryButton
            id={0}
            className="w-full text-center"
            onClick={(e) => setSecondToThird(e.target.id)}
          >
            Trotzdem fortfahren
          </PrimaryButton>
        </div>
      ) : (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}

      {creatables.length > 0 ? (
        <>
          <div
            className={
              "w-full flex justify-center mt-4 " +
              (shownItems >= 40 || creatables.length <= shownItems
                ? "hidden "
                : "")
            }
            hidden={shownItems >= 40 || creatables.length <= shownItems}
            aria-hidden={shownItems >= 40 || creatables.length <= shownItems}
          >
            <PrimaryButton onClick={(e) => setShownItems(shownItems + 10)}>
              Mehr laden
            </PrimaryButton>
          </div>
          {shownItems >= 40 ? (
            <p className="text-center mt-4 p-2">
              Noch nicht das richtige Ergebnis dabei? Dann muss vielleicht die
              Suche präzisiert werden.
              <br />
              <Link href="#firstSection">Zurück zum Formular</Link>
            </p>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </section>
  );
}
