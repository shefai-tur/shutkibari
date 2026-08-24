import { Truck,Leaf,ShieldCheck } from "lucide-react";

export default function TopBar() {
  return (
    <div className=" bg-primary w-full p-2.5">
      <div className="container mx-auto text-white">
        <ul className="flex justify-between">
          <li className="flex gap-2 items-center font-hind-siliguri font-medium ">
            <span>
              <Truck />
            </span>{" "}
            <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
          </li>
          <li className="flex gap-2 items-center font-hind-siliguri font-medium">
            <span>
              <Leaf />
            </span>{" "}
            <span >১০০% কেমিক্যালমুক্ত ও বিষমুক্ত</span>
          </li>
          <li className="flex gap-2 items-center font-hind-siliguri font-medium">
            <span>
              <ShieldCheck />
            </span>{" "}
            <span>নিরাপদ ও সুরক্ষিত প্যাকেজিং</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
