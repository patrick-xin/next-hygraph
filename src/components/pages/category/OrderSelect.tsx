import { Listbox } from "@headlessui/react";
import { MdCheckCircleOutline } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";

import { CATEGORY_ORDERS } from "@/lib/constants";

export const OrderSelect = ({
  order,
  onChange,
}: {
  order: "title_DESC" | "publishedAt_DESC";
  onChange: (order: "Title" | "Published At") => void;
}) => {
  const current =
    CATEGORY_ORDERS[
      Math.max(
        0,
        CATEGORY_ORDERS.findIndex((t) => t.order === order)
      )
    ];

  return (
    <div className="w-40">
      <Listbox value={order} onChange={onChange}>
        <div className="relative border dark:border-white/10 z-100 rounded-lg">
          <Listbox.Button className="inline-flex w-full justify-center bg-white items-center rounded-md dark:bg-black bg-opacity-20 px-4 py-2 text-sm font-medium dark:text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white gap-2 focus-visible:ring-opacity-75">
            <span>{current!.name}</span>
            <BiChevronDown className="w-6 h-6" />
          </Listbox.Button>
          <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md mt-2 py-1 shadow-lg dark:bg-black bg-white text-sm font-medium">
            {CATEGORY_ORDERS.map((order) => (
              <Listbox.Option
                key={order.name}
                value={order.name}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "opacity-100" : "opacity-80"
                  }`
                }
              >
                {({ selected }) => (
                  <div className="inline-flex gap-4">
                    <span
                      className={`block truncate ${
                        selected ? "font-bold" : "font-normal"
                      }`}
                    >
                      {order.name}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MdCheckCircleOutline
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
