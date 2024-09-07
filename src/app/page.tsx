import Salutation from "../components/Salutation";
import RemainingDay from "../components/RemainingDay";
import QuoteOrQuestion from "../components/QuoteOrQuestion";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <>
      <Salutation />
      <RemainingDay />
      <QuoteOrQuestion />
      <ShootingStars />
      <StarsBackground />
    </>
  );
}
