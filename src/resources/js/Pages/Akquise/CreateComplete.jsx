import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage, useRemember } from "@inertiajs/react";
import CreateForm from "./partials/Create_ThirdStep";
import { useState } from "react";
import FirstStep from "./partials/Create_FirstStep";
import axios from "axios";
import SecondStep from "./partials/Create_SecondStep";
import ThirdStep from "./partials/Create_ThirdStep";
import { useEffect } from "react";
import { CircleStackIcon } from "@heroicons/react/24/outline";

export default function CreateComplete({}) {
  const { auth, domain } = usePage().props;

  const [streetAndNumber, setStreetAndNumber] = useRemember(
    "",
    "streetAndNumber"
  );
  const [step, setStepState] = useRemember(1, "step");
  const [creatables, setCreatables] = useRemember([], "creatables");
  const [key, setKeyState] = useRemember(0, "key");
  const [rawData, setRawData] = useRemember([], "rawData");
  const [rawDataLoaded, setRawDataLoaded] = useRemember(false, "rawDataLoaded");

  const setFromFirstToSecond = async (streetAndNumber) => {
    setStepState(2);
    setStreetAndNumber(streetAndNumber);
    const res = await axios.get(
      route("akquise.akquise.listcreatables", {
        strasse: streetAndNumber,
        domain: domain,
      })
    );
    setCreatables(res.data);
    setRawDataLoaded(true);

    // router.get("", { step: step }, { replace: true, preserveState: true });
  };

  useEffect(() => {
    if (creatables.length === 1) {
      setSecondToThird(0);
      console.log("because creatables had length:" + creatables.length);
    }
  }, [creatables]);

  const setSecondToThird = (key) => {
    setKeyState(key);
    setStepState(3);

    // const res = await axios.get(
    //   route("akquise.akquise.detailsOfCreatable", {
    //     lat: key.split("_")[0],
    //     lon: key.split("_")[1],
    //     domain: domain,
    //   })
    // );
    // console.log(res);
    if (creatables.length === 0) {
      setRawData({
        strasse: streetAndNumber.replace(
          " " + streetAndNumber.split(" ").reverse()[0],
          ""
        ),
        hausnummer: streetAndNumber.split(" ").reverse()[0],
      });
    } else {
      var tempArr = creatables[key].composed;
      tempArr.lat = creatables[key].lat;
      tempArr.lon = creatables[key].lon;
      setRawData(tempArr);
    }

    // router.get("", { step: step }, { preserveState: true });
  };

  console.log([streetAndNumber, step, creatables]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Projekt erstellen
        </h2>
      }
    >
      <Head title="Projekt erstellen" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* Eingabe Adresse */}
          {step != 3 ? (
            <FirstStep
              setInput={setFromFirstToSecond}
              streetAndNumber={streetAndNumber}
            />
          ) : (
            ""
          )}
          {/* Adresse mehrfach oder Adresse nicht gefunden und Frage ob veraendern */}
          {step === 2 ? (
            <SecondStep
              creatables={creatables}
              loaded={rawDataLoaded}
              setSecondToThird={setSecondToThird}
            />
          ) : (
            ""
          )}
          {/* Adresse ausgewaehlt, weitere Dateneingabe */}
          {step === 3 ? <ThirdStep rawData={rawData} /> : ""}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
