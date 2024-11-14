import {
  BriefcaseIcon,
  GlobeAltIcon,
  HeartIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const aboutFeatures = [
  {
    name: "Global Reach",
    description:
      "Connecting businesses worldwide with reliable and innovative technology solutions.",
    icon: GlobeAltIcon,
  },
  {
    name: "Industry Expertise",
    description:
      "Our team brings years of industry experience to deliver solutions that meet real-world needs.",
    icon: BriefcaseIcon,
  },
  {
    name: "Commitment to Integrity",
    description:
      "We prioritize honesty and transparency in all of our relationships and operations.",
    icon: ScaleIcon,
  },
  {
    name: "Customer-Centric Approach",
    description:
      "Our customers' success is our success, and we go above and beyond to support them.",
    icon: HeartIcon,
  },
];

export default function SectionAboutComponent() {
  return (
    <div className="bg-transparent py-8 sm:py-8 mx-auto max-w-7xl px-6 lg:px-8 h-full">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base/7 font-semibold text-[#9333ea] ">About Us</h2>
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
          Who We Are and What We Stand For
        </p>
        <p className="mt-6 text-lg/8 text-gray-600">
          Discover our mission, values, and commitment to excellence in
          delivering top-notch solutions.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {aboutFeatures.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base/7 font-semibold text-gray-900">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-[#9333ea]">
                  <feature.icon
                    aria-hidden="true"
                    className="size-6 text-white"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base/7 text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
