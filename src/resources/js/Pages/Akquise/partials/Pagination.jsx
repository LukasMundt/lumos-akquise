import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { Button, Select } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import React from "react";
import { useForm } from "@inertiajs/react";

export default function Pagination({ pagination }) {
  const { get } = useForm();
  console.log(pagination);
  return (
    <div className="w-full flex justify-center">
      {/* <div className="w-16"></div> */}
      <ButtonGroup>
        <Button
          color="gray"
          disabled={pagination.current_page === 1}
          href={pagination.current_page === 1 ? "" : pagination.first_page_url}
          title="First"
        >
          <ChevronDoubleLeftIcon className="w-5" />
        </Button>
        <Button
          color="gray"
          disabled={pagination.prev_page_url === null}
          href={
            pagination.prev_page_url === null
              ? ""
              : route(route().current(), { page: pagination.current_page - 1 })
          }
          title="Previous"
        >
          <ChevronLeftIcon className="w-5" />
        </Button>
        {/* <Button color="gray" className=""></Button> */}
        <Button color="dark" href="">
          {pagination.current_page}
        </Button>
        {/* <Button color="gray"></Button> */}
        <Button
          color="gray"
          disabled={pagination.next_page_url === null}
          href={
            pagination.next_page_url === null
              ? ""
              : route(route().current(), { page: pagination.current_page + 1 })
          }
          title="Next"
        >
          <ChevronRightIcon className="w-5" />
        </Button>
        <Button
          color="gray"
          disabled={pagination.last_page_url === null}
          href={
            pagination.last_page_url === null ? "" : pagination.last_page_url
          }
          title="Last"
        >
          <ChevronDoubleRightIcon className="w-5" />
        </Button>
      </ButtonGroup>
      {/* <Select className="order-last">
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </Select> */}
    </div>
  );
}
