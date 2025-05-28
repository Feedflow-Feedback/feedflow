import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";

export default function feedbackStatusDropdown({ status, setStatus }) {
  const statusOptions = [
    { label: "open", value: "open" },
    { label: "resolved", value: "resolved" },
  ];

  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleSelectChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          {selectedStatus}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {statusOptions.map((option, index) => (
            <MenuItem key={index}>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                onClick={() => handleSelectChange(option.value)}
              >
                {option.label}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
