// import { WalletCard } from '@gaia-x-frontend/components-lib'

const WalletPage = () => {
  // const onActionHandler = (type: string, url: string) => {
  //   console.log(type, url)
  // }

  return (
    <>
      <h3 className="m-0 ml-[2rem] mb-[2rem] text-[1.6rem]">
        Legal participant wallet
      </h3>

      {/* <div className="min-h-[calc(100vh-20.5rem)] bg-white">
        <div className="pl-[2rem] pt-[2rem] flex gap-[1rem] flex-wrap items-start">
          {[0, 1, 2, 4, 5, 6, 7, 8].map((item) => {
            return (
              <WalletCard
                key={item}
                name={'Service Offering Name'}
                vcType={'gx: Service Offering'}
                onAction={onActionHandler}
              />
            )
          })}
        </div>
      </div> */}
    </>
  )
}

export default WalletPage
