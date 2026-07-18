import { HeroShared } from "@/components/hero-shared"

export function Hero() {
  return (
    <HeroShared
      heading={
        <>
          You Focus on
          <br />
          Content. We&apos;ll
          <br />
          Handle Business.
        </>
      }
      subtext="From outreach to negotiation and campaign management, we take care of the hard part so you can keep creating."
      buttonText="Work With Us"
      buttonHref="#contact"
    />
  )
}
