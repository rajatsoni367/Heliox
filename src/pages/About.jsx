export default function About() {
  return (
    <div className="min-h-screen bg-black pt-24 px-6 md:px-12 max-w-[720px] mx-auto pb-20">
      <h1 className="font-heading italic text-[52px] text-white mb-8">About Heliox</h1>
      
      <p className="text-white/80 font-body text-base leading-relaxed mb-12">
        Heliox is a real-time space weather monitoring platform that tracks solar activity and its cascading impact on critical infrastructure including power grids, aviation, GPS navigation, HF radio communications, and satellite operations. All data is sourced live from NOAA's Space Weather Prediction Center, updated every 60 seconds.
      </p>

      <section className="mb-12">
        <h2 className="font-heading italic text-[32px] text-white mb-4">Data Sources</h2>
        <ul className="text-white/70 font-body flex flex-col gap-3 list-disc pl-5">
          <li>
            <a href="https://www.swpc.noaa.gov" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
              NOAA Space Weather Prediction Center
            </a>
          </li>
          <li>NASA DONKI (Future integration)</li>
          <li>ESA Space Weather Service Network</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-heading italic text-[32px] text-white mb-4">Why Space Weather Matters</h2>
        <p className="text-white/70 font-body text-sm leading-relaxed mb-4">
          Space weather describes the variations in the space environment between the sun and Earth. In particular, solar flares and coronal mass ejections (CMEs) can produce intense geomagnetic storms when they interact with Earth's magnetosphere.
        </p>
        <p className="text-white/70 font-body text-sm leading-relaxed">
          These storms pose a significant economic risk and infrastructure vulnerability. Geomagnetically induced currents can damage high-voltage transformers and collapse power grids. Increased radiation poses risks to high-altitude aviation and disrupts HF communications, while ionospheric disturbances degrade the accuracy of GPS and GNSS systems worldwide.
        </p>
      </section>

      <section>
        <h2 className="font-heading italic text-[32px] text-white mb-4">Credits</h2>
        <p className="text-white/70 font-body text-sm leading-relaxed">
          Built by team Heliox, academic project, CSE + AI, Newton School of Technology.
        </p>
      </section>

    </div>
  )
}