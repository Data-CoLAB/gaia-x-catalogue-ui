import { Button, theme } from '@gaia-x-frontend/components-lib'

const ErrorPage = () => {
  const onRefreshHandler = () => {
    location.reload()
  }
  return (
    <div>
      <div className={' bg-[#FAFAFF] h-[100vh]'}>
        <div>
          <img src="/datacolab-logo.svg" alt="" />
        </div>

        <div className="text-center mt-[0rem]">
          <h1
            className={`text-[7rem] text-[${theme.palette.primary.main}] m-0 p-0 font-[600]`}
          >
            Error
          </h1>
        </div>

        <div className="flex mt-[2rem]">
          <div className="w-[30%]">
            <img src="/tower1.png" />
          </div>

          <div className="w-[40%]">
            <p
              className={`text-[3rem] text-[${theme.palette.primary.main}] leading-[1.2] relative top-[-0.9rem] text-center`}
            >
              Oops, <br />
              Something went wrong, please try again
            </p>

            <div className="text-center mt-[8rem]">
              <Button
                variant="contained"
                onClick={onRefreshHandler}
                type="submit"
                color="primary"
              >
                Refresh
              </Button>
            </div>
          </div>

          <div className="w-[30%]">
            <img src="/tower2.png" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { ErrorPage }
