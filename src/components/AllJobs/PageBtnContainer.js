import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  
  /* 用array来表示页码条，第一个参数是list长度，第二个是callback */
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;     /* page从1而不是0开始 */
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type='button' className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
