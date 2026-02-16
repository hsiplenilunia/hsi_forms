import { useStore } from "../../store/testStore"

export function BearControls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}