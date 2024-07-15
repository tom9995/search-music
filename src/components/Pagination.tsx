export function Pagination(props:any) {
    return (
      <div className="mt-8 flex justify-center">
        <button 
        disabled={props.goPrev == null}
        onClick={props.goPrev} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <button
        disabled={props.goNext == null}
        onClick={props.goNext} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4">
          Next
        </button>
      </div>
    );
  }