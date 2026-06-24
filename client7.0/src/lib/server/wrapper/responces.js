import { NextResponse } from "next/server";

const success = ({ data, message, status = 200 }) => {
  return NextResponse.json(
    {
      success: true,
      data: data,
      message: message,
      error: null,
    },
    { status },
  );
};

const failure = ({ message, error, status = 500 }) => {
    console.log("error");
  try {
    const data = NextResponse.json(
      {
        success: false,
        data: null,
        message: message,
        error: error,
      },
      { status },
    );
    
  } catch (e) {
    console.log(e);
  }
};

export { success, failure };
