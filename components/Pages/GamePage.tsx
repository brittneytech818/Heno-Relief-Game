import { useAccount } from "wagmi"
import TokenGateModal from "../TokenGateModal"

const GamePage = () => {
  const { isConnected } = useAccount()
  return (
    <div>
      {!isConnected && <TokenGateModal title="connect" />}
      <iframe src="/game/index.html" title="Hypersurveilled" className="h-[100vh] w-[100vw]" />
    </div>
  )
}

export default GamePage
