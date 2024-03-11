export const sleep = async (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000))

export const mainLayout = () => {
  return () => ({
    template: `
      <MainLayout>
        <story />
      </MainLayout>
  `,
  })
}
