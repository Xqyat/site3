// export default function LoadMoreBtn({ onClick, disabled }) {
//     return (
//       <button
//         className="load-more-btn"
//         onClick={onClick}
//         disabled={disabled}
//       >
//         {disabled ? 'No data' : 'Load more'}
//       </button>
//     );
//   }
  
export default function LoadMoreBtn({ onClick }) {
  return (
    <button className="loadmore" onClick={onClick}>
      LOAD MORE
    </button>
  );
}
