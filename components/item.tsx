export default ({item}: {item: Item}) => <div className='flex-container' key={item.id}>
  <div className='flex-child-grow'>
    {item.title}
  </div>
  <div className='flex-child-shrink align-right'>
    {item.price}
  </div>
</div>
