import { HeroShared } from "@/components/hero-shared"

export function Hero() {
  return (
    <HeroShared
      heading={
        <>
          Scale With
          <br />
          Creators Who
          <br />
          Actually Convert
        </>
      }
      subtext="NeoCampaign helps brands find, manage, and launch campaigns with creators who can turn attention into clicks, signups, and sales."
      buttonText="Start a Campaign"
      buttonHref="#contact"
    />
  )
}
