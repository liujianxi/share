import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './home.scss'

export default class Home extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'home页面'
  }

  componentWillMount () { 
    console.log(this.$router.params)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  goIndex(){
    Taro.redirectTo({
        url: '/pages/index/index?str=home'
    })
  }
  render () {
    return (
      <View className='index'>
        <Text>这是home页面</Text>
        <Button className='add' onClick={this.goIndex}>跳转</Button>
      </View>
    )
  }
}
