import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex flex-col items-center justify-center my-24 gap-3 space-y-4 w-11/12 mx-auto">
            <img className="lg:w-1/3 mx-auto" src="/404-cat.svg" alt="" />
            <div>
                <h2 className="font-semibold text-2xl text-center">Sorry, an unexpected error has occurred.</h2>
                <h4 className="font-medium text-lg text-center">
                    <i>{error.statusText || error.message}</i>
                </h4>
            </div>
            <div className="flex gap-2">
                <button onClick={() => window.location.reload(true)} className="btn btn-neutral">
                    Reload
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>

                <button onClick={() => navigate('')} className="btn btn-neutral">
                    Go Home
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </button>

                <button onClick={() => navigate(-1)} className="btn btn-neutral">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Go Back
                </button>
            </div>
        </div>
    );
}