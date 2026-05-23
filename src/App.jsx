import { useState } from "react"
import {
  ScanFace,
  ShieldCheck,
  BadgeCheck,
  User,
  Building2,
} from "lucide-react"

export default function App() {

  const [code, setCode] = useState("------")
  const [inputCode, setInputCode] = useState("")
  const [message, setMessage] = useState("")
  const [verified, setVerified] = useState(false)
  const [studentName, setStudentName] = useState("Unknown")

  const generateCode = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/generate-code"
    )

    const data = await response.json()

    setCode(data.code)

  }

  const verifyCode = () => {

    if (inputCode === code) {

      setMessage("Verification Successful")
      setVerified(true)

    } else {

      setMessage("Wrong Code")

    }

  }

  const checkFace = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/face-status"
    )

    const data = await response.json()

    setStudentName(data.student)

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8faff] to-[#ede9fe] flex justify-center items-center p-4 relative overflow-hidden">

  {/* BACKGROUND BLOBS */}

  <div className="absolute top-0 left-0 w-72 h-72 bg-violet-300 opacity-20 blur-3xl rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>

      <div className="w-full max-w-sm">

        {/* HEADER */}

        <div className="text-center mb-6">

          <h1 className="text-3xl font-black text-gray-800">
            AI Smart Attendance
          </h1>

          <p className="text-gray-500 mt-2">
            Face Recognition + Verification
          </p>

        </div>

        {/* FACE CARD */}

        <div className="bg-white/70 backdrop-blur-2xl rounded-[32px] p-6 shadow-xl border border-white/50">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-800">
              Face Recognition
            </h2>

            <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">

              <ScanFace className="text-violet-600" />

            </div>

          </div>

          {/* FACE SCAN */}

          <div className="mt-6 flex justify-center">

            <div className="w-52 h-52 rounded-3xl border-[6px] border-violet-500 bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center relative overflow-hidden">

              <div className="absolute w-full h-2 bg-violet-500 animate-pulse"></div>

              <ScanFace size={80} className="text-violet-700" />

            </div>

          </div>

          <div className="text-center mt-5">

            <p className="text-green-600 font-semibold">
              Face Recognized
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              {studentName}
            </h2>

          </div>

          <button
            onClick={checkFace}
            className="w-full h-14 mt-6 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.02] duration-200"
          >
            Scan Face
          </button>

        </div>

        {/* VERIFICATION */}

        <div className="bg-white/70 backdrop-blur-2xl rounded-[32px] p-6 shadow-xl border border-white/50 mt-6">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-800">
              Verification
            </h2>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

              <ShieldCheck className="text-blue-600" />

            </div>

          </div>

          {/* CODE */}

          <div className="mt-8 text-center">

            <h1 className="text-4xl font-black tracking-[10px] text-violet-600">
              {code}
            </h1>

            <button
              onClick={generateCode}
              className="mt-6 px-6 h-12 rounded-2xl bg-violet-600 text-white font-semibold hover:bg-violet-700 duration-200"
            >
              Generate Code
            </button>

          </div>

          {/* INPUT */}

          <input
            type="text"
            placeholder="Enter Verification Code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="w-full h-14 mt-6 rounded-2xl border border-gray-200 px-4 text-center text-2xl font-bold outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            onClick={verifyCode}
            className="w-full h-14 mt-6 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.02] duration-200"
          >
            Verify Attendance
          </button>

          <p className={`text-center mt-4 font-semibold ${
            verified ? "text-green-600" : "text-red-500"
          }`}>
            {message}
          </p>

        </div>

        {/* STATUS */}

        <div className="bg-white/70 backdrop-blur-2xl rounded-[32px] p-6 shadow-xl border border-white/50 mt-6 mb-8">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-800">
              Attendance Status
            </h2>

            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              verified ? "bg-green-100" : "bg-gray-100"
            }`}>

              <BadgeCheck className={
                verified ? "text-green-600" : "text-gray-400"
              } />

            </div>

          </div>

          {!verified ? (

            <div className="text-center mt-10">

              <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">

                <BadgeCheck size={40} className="text-gray-400" />

              </div>

              <p className="mt-5 text-gray-500">
                Waiting for verification
              </p>

            </div>

          ) : (

            <div className="mt-8">

              <div className="w-24 h-24 mx-auto rounded-full bg-green-500 flex items-center justify-center shadow-lg">

                <BadgeCheck size={45} className="text-white" />

              </div>

              <h1 className="text-3xl font-black text-center text-green-600 mt-5">
                Attendance Marked
              </h1>

              {/* DETAILS */}

              <div className="space-y-4 mt-8">

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">

                    <User className="text-violet-600" />

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Student Name
                    </p>

                    <h2 className="font-bold text-gray-800">
                      {studentName}
                    </h2>

                  </div>

                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                    <Building2 className="text-blue-600" />

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Department
                    </p>

                    <h2 className="font-bold text-gray-800">
                      Computer Science
                    </h2>

                  </div>

                </div>

                <div className="bg-green-50 rounded-2xl p-4">

                  <p className="text-sm text-green-600">
                    Attendance Status
                  </p>

                  <h2 className="font-black text-2xl text-green-700">
                    PRESENT
                  </h2>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  )

}