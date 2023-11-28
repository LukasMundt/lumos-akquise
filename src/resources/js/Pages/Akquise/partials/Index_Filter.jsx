import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { Accordion, Button, Checkbox, Label } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import React from "react";
import { useForm } from "@inertiajs/react";
import Card from "@/Components/Card";
// import Checkbox from "@/Components/Inputs/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

export default function Index_Filter({}) {
  const { filterCols, filter } = usePage().props;
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  // var { filter } = usePage().props;
  const [filters, setFilters] = useState(filter);
  // console.log(filterCols);
  // console.log(filter);

  // lädt die parameter der aktuellen Seite in ein Array
  let paramsRaw = new URLSearchParams(window.location.search)
    .toString()
    .split("&");
  const params = {};
  paramsRaw.map((param) => {
    let split = param.split("=");
    params[split[0]] = decodeURI(split[1]);
  });

  const handleClick = () => {
    var filterStr = "";
    Object.values(filters).map((currentFilter, index) => {
      if (filterStr == "") {
        filterStr =
          Object.keys(filters)[index] + ":" + currentFilter.toString();
      } else {
        filterStr =
          filterStr +
          ";" +
          Object.keys(filters)[index] +
          ":" +
          currentFilter.toString();
      }
    });
    params["filter"] = decodeURI(filterStr);
    router.get(route(route().current(), params));
  };

  const setzeFilter = (e) => {
    if (!Object.keys(filters).includes(e.target.dataset.key.toLowerCase())) {
      // Filter für diesen Key ist nicht gesetzt
      var current = [];
      current.push(e.target.id);
      console.log("Ich bin in diesem fall");
    } else {
      // Filter für diesen Key sind bereits vorhanden
      var current = filters[e.target.dataset.key.toLowerCase() + ""];

      if (current.includes(e.target.id + "")) {
        // entferne aus current wenn jetzt nicht checked
        current = current
          .slice(0, current.indexOf(e.target.id + ""))
          .concat(current.slice(current.indexOf(e.target.id + "") + 1));
        console.log("entfernen");
        console.log(current);
      } else if (e.target.checked) {
        // füge current hinzu
        current.push(e.target.id + "");
      }
    }

    // current.pop(value);
    // console.log(e.target.dataset.key);
    // console.log(Object.keys(filters).includes(e.target.dataset.key.toLowerCase()));

    const allFilters = filters;
    allFilters[e.target.dataset.key.toLowerCase() + ""] = current;
    setFilters(allFilters);
    // setFilters(allFilters);
    console.log(filters);
    forceUpdate();
  };

  return (
    <>
      <Accordion>
        {filterCols != null
          ? Object.values(filterCols).map((filterCol, index) => (
              <Accordion.Panel key={index}>
                <Accordion.Title>
                  {Object.keys(filterCols)[index]}
                </Accordion.Title>
                <Accordion.Content className="default-text-color">
                  <PrimaryButton
                    as="button"
                    type="button"
                    onClick={handleClick}
                  >
                    Filter anwenden
                  </PrimaryButton>
                  {filterCol.map((filterVal, i) => {
                    return (
                      <div key={i}>
                        <Checkbox
                          data-key={Object.keys(filterCols)[index]}
                          id={filterVal.value}
                          onChange={setzeFilter}
                          checked={(
                            Object.values(filters)[
                              Object.keys(filters).indexOf(
                                Object.keys(filterCols)[index].toLowerCase()
                              )
                            ] ?? []
                          ).includes(filterVal.value)}
                        />
                        <Label className="ml-2" htmlFor={filterVal.value}>
                          {filterVal.value + " (" + filterVal.count + ")"}
                        </Label>
                      </div>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Panel>
            ))
          : ""}
      </Accordion>
    </>
  );
}

// export default class Index_Filter extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = props.filter??{};
//   }

//   render(){

//   }
// }
